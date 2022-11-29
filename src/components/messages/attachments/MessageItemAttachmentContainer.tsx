import React, { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import { useKeydown } from "../../../utils/hooks";
import { OverlayStyle } from "src/components/modals/styles";
import { GroupMessageType, MessageType } from "../../../utils/types";
import styles from "./index.module.scss";
import { Grid, GridItem } from "@chakra-ui/react";

type alignType = "left" | "right";

type Props = {
  align: alignType;
  message: MessageType | GroupMessageType;
};
export const MessageItemAttachmentContainer: FC<Props> = ({
  align,
  message,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onClick = (url: string) => {
    setShowOverlay(true);
    setImageUrl(url);
  };

  const handleKeydown = (e: KeyboardEvent) =>
    e.key === "Escape" && setShowOverlay(false);
  useKeydown(handleKeydown);

  return (
    <>
      {showOverlay && (
        <OverlayStyle>
          <MdClose
            className={styles.closeIcon}
            onClick={() => setShowOverlay(false)}
          />
          <img src={imageUrl} alt="overlay" style={{ maxHeight: "90%" }} />
        </OverlayStyle>
      )}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        sx={{ direction: align === "right" ? "rtl" : "ltr" }}
      >
        {message.attachments?.map((attachment) => (
          <GridItem w="100%" key={attachment.url}>
            <img
              src={attachment.url}
              width={200}
              alt={attachment.url}
              onClick={() => onClick(attachment.url)}
              style={{ cursor: "pointer" }}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
