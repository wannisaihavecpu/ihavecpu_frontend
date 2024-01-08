import React, { FC } from "react";
import { isValid, format } from 'date-fns';
import { th } from "date-fns/locale";

interface DateFormatProps {
  date: string;
}

const DateFormat: FC<DateFormatProps> = ({ date }) => {
  const isValidDate = isValid(new Date(date));

  const thaiFormattedBirthday = isValidDate
    ? format(new Date(date), "d MMMM yyyy", { locale: th })
    : "-";

  return <span>{thaiFormattedBirthday}</span>;
};

export default DateFormat;
