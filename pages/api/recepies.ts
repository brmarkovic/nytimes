import Axios from 'axios';

export interface apiRecepiesI {
  title: string;
}

export default async (req, res) => {
  const output: apiRecepiesI = {
    title: 'Search recepies',
  };
  res.status(200).json(output);
};

export async function apiRecepies() {
  const url = `http://localhost:3000/api/recepies`;
  const [err, data] = await Axios.get(url)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);

  const output = err ? {} : data;

  return output;
}
