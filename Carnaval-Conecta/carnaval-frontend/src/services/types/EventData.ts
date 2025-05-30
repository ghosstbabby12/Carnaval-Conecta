export interface EventData {
  id?: number;
  title: string;
  location: string;
  description: string;
  date: string;
  media?: File | null;
  bannerUrl: string; // ¡ya no opcional! así evitas el error de TypeScript
}
