import Axios from 'axios';

export interface apiRecepiesSearchI {
  title: string;
  version: number;
  href: string;
  results: {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
  }[];
}

export default async (req, res) => {
  const q = req?.query?.q?.split(' ').join('+') || '';
  const [err, data] = await Axios.get(`http://www.recipepuppy.com/api/?q=${q}`)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);
  const output = err ? {} : data;

  res.status(200).json(output);
};

export async function apiRecepiesSearch({ value }: { value: string }) {
  const valuePlus = value?.split(' ').join('+');
  const url = `http://localhost:3000/api/recepies-search?q=${valuePlus}`;
  const [err, data] = await Axios.get(url)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);
  const output = err ? {} : data;

  return output;
}
