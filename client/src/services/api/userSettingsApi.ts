import {AxiosResponse} from "axios";

import {ChangePhoneResponse, Settings} from "../../store/ducks/user/contracts/state";
import {axios} from "../../core/axios";
import {AuthenticationResponse} from "../../store/types/auth";
import {
    API_SETTINGS_UPDATE_BACKGROUND_COLOR,
    API_SETTINGS_UPDATE_COLOR_SCHEME,
    API_SETTINGS_UPDATE_COUNTRY,
    API_SETTINGS_UPDATE_EMAIL,
    API_SETTINGS_UPDATE_PHONE,
    API_SETTINGS_UPDATE_USERNAME
} from "../../util/endpoints";

export const UserSettingsApi = {
    async updateUsername(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_USERNAME, settings);
    },
    async updateEmail(settings: Settings): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.put<AuthenticationResponse>(API_SETTINGS_UPDATE_EMAIL, settings);
    },
    async updatePhone(settings: Settings): Promise<AxiosResponse<ChangePhoneResponse>> {
        return await axios.put<ChangePhoneResponse>(API_SETTINGS_UPDATE_PHONE, settings);
    },
    async updateCountry(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_COUNTRY, settings);
    },
    async updateColorScheme(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_COLOR_SCHEME, settings);
    },
    async updateBackgroundColor(settings: Settings): Promise<AxiosResponse<string>> {
        return await axios.put<string>(API_SETTINGS_UPDATE_BACKGROUND_COLOR, settings);
    },
}
