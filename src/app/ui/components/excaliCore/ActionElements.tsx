import { ActionIcon, Tooltip } from '@mantine/core';
import classes from './ActionElements.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';

const ActionElements = ({ hasChanged, handleChangesSaved }:
  { hasChanged: boolean, handleChangesSaved: () => void }) => {

  return (
    <div className={classes.main}>
      <ActionIcon size="lg" radius="md">
        <IoSettingsOutline />
      </ActionIcon>
      <Tooltip label={hasChanged ? "Save changes" : "No changes"} position="left" withArrow>
        <ActionIcon size="lg" radius="md" color='green'
          disabled={!hasChanged}
          onClick={handleChangesSaved}>
          <IoIosSave />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default ActionElements;