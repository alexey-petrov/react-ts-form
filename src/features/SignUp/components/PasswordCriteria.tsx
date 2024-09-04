import { ListItem } from "@mui/material";
import { COLOR_ERROR, COLOR_PRIMARY, COLOR_SUCCESS } from "../styles";
import { useCallback } from "react";

interface PasswordCriteriaProps {
  criteria: boolean;
  message: string;
  isEdited: boolean;
  isError: boolean;
}

export const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  criteria,
  message,
  isEdited,
  isError,
}) => {
  const getColor = useCallback(() => {
    if (!criteria && isError) return COLOR_ERROR;

    if (!isEdited) return COLOR_PRIMARY;
    if (criteria) return COLOR_SUCCESS;
  }, [criteria, isEdited, isError]);

  return (
    <ListItem
      style={{
        color: getColor(),
        paddingLeft: 0,
        fontSize: 13,
      }}
    >
      {message}
    </ListItem>
  );
};
