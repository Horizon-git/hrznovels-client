export function timeSince(date: string | undefined): string {
  if (!date) {
    return 'never';
  }
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds >= intervals.year) {
    const years = Math.floor(seconds / intervals.year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }

  if (seconds >= intervals.month) {
    const months = Math.floor(seconds / intervals.month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  if (seconds >= intervals.day) {
    const days = Math.floor(seconds / intervals.day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  if (seconds >= intervals.hour) {
    const hours = Math.floor(seconds / intervals.hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const minutes = Math.floor(seconds / intervals.minute);
  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
}
