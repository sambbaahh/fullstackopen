export interface Diary {
    id: number;
    date: string;
    weather: string;
    visibility: string;  
}

export interface DiaryEntry {
    date: string;
    weather: string;
    visibility: string; 
    comment: string;
}