export type Loompa = {
  id: string;
  first_name: string;
  last_name: string;
  favorite: Record<"color" | "food" | "ramdom_string" | "song", string>;
  gender: "F" | "M";
  image: string;
  profession: string;
  email: string;
  age: string;
  country: string;
  height: string;
};

export type LoompaDetail = Loompa & {
  description: string;
  quota: string;
};
