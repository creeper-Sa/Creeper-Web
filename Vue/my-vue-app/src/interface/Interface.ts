export interface CountDataItem {
  name: string;
  value: number;
  icon: string;
  color: string;
}

export interface TableDataItem {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

export interface VideoItem {
  name: string;
  value: number;
}
export interface MenuItem {
  path: string;
  name: string;
  label: string;
  icon: string;
  url: string;
  children?: MenuItem[];
   component?: any;
}