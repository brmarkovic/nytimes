import Axios from 'axios';

export async function apiRecepies() {
  const url = `http://localhost:3000/api/recepies`;
  const [err, data] = await Axios.get(url)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);
  const output = err ? {} : data;

  return output;
}

export default async function recepies(req, res) {
  const output = {
    title: 'Search recepies',
  };
  res.status(200).json(output);
}

export interface apiRecepiesI {
  title: string;
}
