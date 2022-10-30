import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store';
import { updateType } from 'src/store/selectedSlice';
import { chatTypes } from 'src/utils/constants';
import {
  ConversationSelectedItem,
  ConversationSelectedStyle,
} from './styles';
import { ConversationTypeData } from 'src/utils/types';

export const ConversationSelected = () => {
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type));
    if (chat.type === 'group') navigate('/home/groups');
    else navigate('/home/conversations');
  };
  return (
    <ConversationSelectedStyle>
      {chatTypes.map((chat) => (
        <ConversationSelectedItem
          selected={chat.type === selectedType}
          key={chat.type}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </ConversationSelectedItem>
      ))}
    </ConversationSelectedStyle>
  );
};
