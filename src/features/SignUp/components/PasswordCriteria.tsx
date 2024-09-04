import { ListItem } from "@mui/material";
import { COLOR_ERROR, COLOR_PRIMARY, COLOR_SUCCESS } from "../styles";
import { useCallback } from "react";

interface PasswordCriteriaProps {
  criteria: boolean;
  message: string;
  isError: boolean;
}

export const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  criteria,
  message,
  isError,
}) => {
  const getColor = useCallback(() => {
    if (!criteria && isError) return COLOR_ERROR;

    if (criteria) return COLOR_SUCCESS;

    return COLOR_PRIMARY;
  }, [criteria, isError]);

  return (
    <ListItem
      style={{
        color: getColor(),
        padding: 0,
        fontSize: 13,
        lineHeight: "18px",
      }}
    >
      {message}
    </ListItem>
  );
};
