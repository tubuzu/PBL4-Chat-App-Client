import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { selectType } from '../../store/selectedSlice';
import { GroupHeaderIcons, MessagePanelHeaderStyle } from './styles';
import { PersonAdd, PeopleGroup } from 'akar-icons';
import { AddGroupRecipientModal } from '../modals/AddGroupRecipientModal';
import { toggleSidebar } from '../../store/groupRecipientsSidebarSlice';

export const MessagePanelHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.authentication.userData);
  const { id } = useParams();

  const type = useSelector(selectType);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, id!)
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, id!)
  );

  const dispatch = useDispatch<AppDispatch>();
  // const recipient = getRecipientFromConversation(conversation, user);
  const displayName =
    user?._id === conversation?.creator._id
      ? `${conversation?.recipient.firstname} ${conversation?.recipient.lastname}`
      : `${conversation?.creator.firstname} ${conversation?.creator.lastname}`;
  const groupName = group?.title || 'Group';
  const headerTitle = type === 'group' ? groupName : displayName;

  return (
    <>
      {showModal && (
        <AddGroupRecipientModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <MessagePanelHeaderStyle>
        <div>
          <span>{headerTitle}</span>
        </div>
        <GroupHeaderIcons>
          {type === 'group' && user?._id === group?.owner?._id && (
            <PersonAdd
              cursor="pointer"
              size={30}
              onClick={() => setShowModal(true)}
            />
          )}
          {type === 'group' && (
            <PeopleGroup
              cursor="pointer"
              size={30}
              onClick={() => dispatch(toggleSidebar())}
            />
          )}
        </GroupHeaderIcons>
      </MessagePanelHeaderStyle>
    </>
  );
};
