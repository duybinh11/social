import format from "date-fns/format";
import isYesterday from "date-fns/isYesterday";
import isMonday from "date-fns/isMonday";
import isTuesday from "date-fns/isTuesday";
import isWednesday from "date-fns/isWednesday";
import isThursday from "date-fns/isThursday";
import isFriday from "date-fns/isFriday";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import isToday from "date-fns/isToday";
import viLang from "date-fns/locale/vi/index";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import {PollResponse} from "../store/types/tweet";

export const formatDate = (date: Date): string => {
    return format(date, 'd MMM', {locale: viLang});
};

export const formatScheduleDate = (date: Date): string => {
    return format(date, "EEE, d MMM yyyy 'lúc' HH:mm", {locale: viLang});
};

export const formatChatMessageDate = (date: Date): string => {
    const datePattern = format(date, 'HH:mm', {locale: viLang});

    if (isToday(date)) return datePattern;

    if (isYesterday(date)) return `Hôm qua lúc ${datePattern}`;

    if (isMonday(date)) return `Thứ 2 ${datePattern}`;

    if (isTuesday(date)) return `Thứ 3 ${datePattern}`;

    if (isWednesday(date)) return `Thứ 4 ${datePattern}`;

    if (isThursday(date)) return `Thứ 5 ${datePattern}`;

    if (isFriday(date)) return `Thứ 6 ${datePattern}`;

    if (isSaturday(date)) return `Thứ 7 ${datePattern}`;

    if (isSunday(date)) return `CN ${datePattern}`;

    return format(date, 'd MMM, HH:mm', {locale: viLang});
};

export const voteFormatDate = (poll: PollResponse): string => {
    const diffInDays = differenceInDays(new Date(poll?.dateTime!), Date.now());
    const diffInHours = differenceInHours(new Date(poll?.dateTime!), Date.now());
    const diffInMinutes = differenceInMinutes(new Date(poll?.dateTime!), Date.now());

    if (diffInDays !== 0) {
        return diffInDays + " ngày";
    } else if (diffInHours !== 0) {
        return diffInHours + " giờ";
    } else {
        return diffInMinutes + " phút";
    }
};
