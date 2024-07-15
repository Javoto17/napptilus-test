export type Loompa = {
  id: string;
  first_name: string;
  last_name: string;
  favorite: Record<"color" | "food" | "ramdom_string", string>;
  gender: "F" | "M";
  image: string;
  profession: string;
  email: string;
  age: string;
  country: string;
  height: string;
};
