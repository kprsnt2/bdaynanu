export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BalloonType {
  id: string;
  color: string;
  left: number; // percentage
  speed: number; // seconds duration
  delay: number; // seconds delay
  size: number; // scale
  isPopping: boolean;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}