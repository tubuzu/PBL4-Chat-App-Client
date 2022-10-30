import React, { Dispatch, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addGroupRecipient } from "src/Pages/GroupPage/queries";
import {
  Button,
  // InputContainer,
  // InputField,
  // InputLabel,
  RecipientChipContainer,
} from "./styles";
import styles from "./index.module.scss";
import { useToastHook } from "src/utils/hooks/useToast";
import { User } from "src/utils/types";
import { SelectedGroupRecipientChip } from "../recipients/SelectedGroupRecipientChip";
import { GroupRecipientsField } from "../recipients/GroupRecipientsField";
import { RecipientResultContainer } from "../recipients/RecipientResultContainer";
import { useDebounce } from "src/utils/hooks/useDebounce";
import { searchUsers } from "src/utils/apis";
// import { addGroupRecipientThunk } from "src/store/groupSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "src/store";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const GroupRecipientAddForm: FC<Props> = ({ setShowModal }) => {
  const { id: groupId } = useParams();
  // const [username, setUsername] = useState("");
  const { success, error } = useToastHook();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);
  // const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          console.log(data);
          setResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRecipients.length === 0) return;
    const recipients = selectedRecipients.map((user) => user._id);
    // console.log(recipients);
    // dispatch(addGroupRecipientThunk({ _id: groupId!, recipients: recipients }))
    addGroupRecipient({ _id: groupId!, recipients: recipients })
      .then(() => {
        success("Recipient Added to Group");
        setSelectedRecipients([]);
        setShowModal(false);
      })
      .catch((err: any) => {
        console.log(err);
        error("Failed to add user");
      });
  };

  const handleUserSelect = (user: User) => {
    const exists = selectedRecipients.find((u) => u._id === user._id);
    if (!exists) setSelectedRecipients((prev) => [...prev, user]);
    setResults([]);
    setQuery('');
  };

  const removeUser = (user: User) =>
    setSelectedRecipients((prev) => prev.filter((u) => u._id !== user._id));

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      {/* <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer> */}
      <RecipientChipContainer>
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip
            key={user._id}
            user={user}
            removeUser={removeUser}
          />
        ))}
      </RecipientChipContainer>
      <GroupRecipientsField query={query} setQuery={setQuery} />
      {results.length > 0 && query && (
        <RecipientResultContainer
          userResults={results}
          handleUserSelect={handleUserSelect}
        />
      )}
      <Button
        style={{ margin: "10px 0" }}
        disabled={selectedRecipients.length === 0}
      >
        Add Recipient
      </Button>
    </form>
  );
};
