import React, { FC } from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface DateFormatProps {
  date: string;
}

const DateFormat: FC<DateFormatProps> = ({ date }) => {
  const thaiFormattedBirthday = date
    ? format(new Date(date), "d MMMM yyyy", { locale: th })
    : "-";

  return <span>{thaiFormattedBirthday}</span>;
};

export default DateFormat;
