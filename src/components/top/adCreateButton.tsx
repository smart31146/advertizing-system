import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import CreateAdDialog from "../parts/createAdDialog";
import { IconButton, Tooltip } from "@mui/material";

type Props = {
  title: string;
};

const AdCreateButton = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        aria-label="detail"
        size="small"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <Tooltip title="広告の作成">
          <CreateIcon />
        </Tooltip>
      </IconButton>
      <CreateAdDialog open={open} setOpen={setOpen} titles={[title]} />
    </>
  );
};

export default AdCreateButton;
