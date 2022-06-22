const ONE_MINUTE_IN_MILLISECONDS = 60000;
const ONE_HOUR_IN_MILLISECONDS = ONE_MINUTE_IN_MILLISECONDS * 60;
const ONE_DAY_IN_MILLISECONDS = ONE_HOUR_IN_MILLISECONDS * 24;

function parseDate(date: Date | string) {
  const usableDate = typeof date === "string" ? new Date(date) : date;
  return usableDate;
}

function formatDate(date: Date | string) {
  const parsedDate = parseDate(date);

  return `${
    parsedDate.getDate().toString().length === 1
      ? `0${parsedDate.getDate()}`
      : parsedDate.getDate()
  }/${
    (parsedDate.getMonth() + 1).toString.length === 1
      ? `0${parsedDate.getMonth() + 1}`
      : parsedDate.getMonth() + 1
  }/${parsedDate.getFullYear()} ${
    parsedDate.getHours().toString().length === 1
      ? `0${parsedDate.getHours()}`
      : parsedDate.getHours()
  }:${
    parsedDate.getMinutes().toString().length === 1
      ? `0${parsedDate.getMinutes()}`
      : parsedDate.getMinutes()
  }`;
}

function howLongHasBeenSinceDate(date: Date | string) {
  const parsedData = parseDate(date);

  const diffenceInMillisecondsBetweenDates =
    new Date().getTime() - parsedData.getTime();

  if (diffenceInMillisecondsBetweenDates < ONE_MINUTE_IN_MILLISECONDS) {
    return "há alguns segundos atrás";
  }

  if (diffenceInMillisecondsBetweenDates < ONE_HOUR_IN_MILLISECONDS) {
    if (diffenceInMillisecondsBetweenDates < ONE_MINUTE_IN_MILLISECONDS * 2) {
      return "há 1 minuto atrás";
    }
    return `há ${
      String(
        diffenceInMillisecondsBetweenDates / ONE_MINUTE_IN_MILLISECONDS
      ).split(".")[0]
    } minutos atrás`;
  }

  if (diffenceInMillisecondsBetweenDates < ONE_DAY_IN_MILLISECONDS) {
    if (diffenceInMillisecondsBetweenDates > ONE_HOUR_IN_MILLISECONDS) {
      return `há ${
        String(
          diffenceInMillisecondsBetweenDates / ONE_HOUR_IN_MILLISECONDS
        ).split(".")[0]
      } horas atrás`;
    }

    return `há 1 hora atrás`;
  }

  if (diffenceInMillisecondsBetweenDates < ONE_DAY_IN_MILLISECONDS * 2) {
    return "há 1 dia atrás";
  }

  return `há ${
    String(diffenceInMillisecondsBetweenDates / ONE_DAY_IN_MILLISECONDS).split(
      "."
    )[0]
  } dias`;
}

export { parseDate, formatDate, howLongHasBeenSinceDate };
