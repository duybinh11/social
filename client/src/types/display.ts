import {BackgroundTheme, ColorScheme} from "../store/types/common";

export interface DisplayProps {
    changeBackgroundColor: (background: BackgroundTheme) => void;
    changeColorScheme: (color: ColorScheme) => void;
}
