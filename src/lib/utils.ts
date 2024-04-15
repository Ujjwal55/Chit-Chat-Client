import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleString('en-US', {
    // year: 'numeric',
    // month: 'short',
    // day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});

  return formattedDateTime;
}

export function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getFileFormat(url: string): "image" | "video" | "audio" | "other" {
  const fileExtension = url.split('.').pop();
  if(fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif"){
    return "image";
  }
  else if(fileExtension === "mp4" || fileExtension === "mov" || fileExtension === "avi") {
    return "video";
  } else if(fileExtension === "mp3" || fileExtension === "wav" || fileExtension === "flac") {
    return "audio";
  }

  // other formats maybe added here
  return "image";
}