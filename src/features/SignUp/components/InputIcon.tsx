import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

interface InputIcon {
  name: string;
  onTogglePasswordVisibility?: () => void;
  showPassword?: boolean;
}

export const InputIcon: React.FC<InputIcon> = ({
  name,
  onTogglePasswordVisibility,
  showPassword,
}) => {
  return name === "password" && onTogglePasswordVisibility ? (
    <InputAdornment position="end">
      <IconButton onClick={onTogglePasswordVisibility} edge="end" size="small">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ) : null;
};
