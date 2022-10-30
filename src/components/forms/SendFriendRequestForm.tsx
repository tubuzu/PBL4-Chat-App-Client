import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createFriendRequestThunk } from "../../store/friends/friendsThunk";
import { Button, InputContainer, InputField, InputLabel } from "./styles";
import styles from "./index.module.scss";
import { useToastHook } from "src/utils/hooks/useToast";
import { RecipientResultContainer } from "../recipients/RecipientResultContainer";
import { User } from "src/utils/types";
import { SelectedRecipientChip } from "../recipients/SelectedRecipientChip";
import { useDebounce } from "src/utils/hooks/useDebounce";
import { searchUsers } from "src/utils/apis";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
  // const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const { success, error } = useToastHook();
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const debouncedQuery = useDebounce(query, 1000);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(selectedUser?._id!))
      .unwrap()
      .then(() => {
        console.log("Success Friend Request");
        setShowModal(false);
        success("Friend Request Sent!");
      })
      .catch((err) => {
        console.log(err);
        error("Error sending friend request");
      });
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setUserResults([]);
    setQuery("");
  };

  useEffect(() => {
    if (debouncedQuery) {
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          console.log(data);
          setUserResults(data);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedQuery]);

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        {selectedUser ? (
          <SelectedRecipientChip
            user={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <InputField onChange={(e) => setQuery(e.target.value)} />
        )}
        {!selectedUser && userResults.length > 0 && query && (
          <RecipientResultContainer
            userResults={userResults}
            handleUserSelect={handleUserSelect}
          />
        )}
      </InputContainer>
      <Button style={{ margin: "10px 0" }} disabled={!selectedUser}>
        Send
      </Button>
    </form>
  );
};
