import Axios from 'axios';

export interface apiRecepiesI {
  title: string;
}
export async function apiRecepies(): Promise<apiRecepiesI> {
  const apiServer = process.env.NEXT_PUBLIC_API_SERVER_ROOT || 'http://localhost:3000';
  const url = `${apiServer}/api/recepies`;
  const [err, data] = await Axios.get(url)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);
  const output = err ? {} : data;

  return output;
}

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
export async function apiRecepiesSearch({ value }: { value: string }): Promise<apiRecepiesSearchI> {
  const apiServer = process.env.NEXT_PUBLIC_API_SERVER_ROOT || 'http://localhost:3000';
  const valuePlus = value?.split(' ').join('+');
  const url = `${apiServer}/api/recepies?search=${valuePlus}`;
  const [err, data] = await Axios.get(url)
    .then((r) => [null, r?.data])
    .catch((e) => [e]);
  const output = err ? {} : data;

  return output;
}

export default async function recepies(req, res) {
  const { query, method } = req || {};
  const methodLowercase = method?.toLowerCase(); // POST,Post,post > post

  let output;
  if (methodLowercase === 'get') {
    // GET EXISTING RECORDS
    if (query?.search) {
      // multiple records
      const q = query?.search?.split(' ').join('+') || '';
      const [err, data] = await Axios.get(`http://www.recipepuppy.com/api/?q=${q}`)
        .then((r) => [null, r?.data])
        .catch((e) => [e]);
      output = err ? {} : data;
    } else if (query.id) {
      // single record
    } else {
      // initial data
      output = {
        title: 'Search recepies',
      };
    }
  } else if (methodLowercase === 'post') {
    // ADD NEW RECORD
  } else if (methodLowercase === 'put') {
    // REPLACE EXISTING RECORD
  } else if (methodLowercase === 'patch') {
    // UPDATE EXISTING RECORD
  } else if (methodLowercase === 'delete') {
    // DELETE EXISTING RECORD
  }
  res.status(200).json(output);
}
