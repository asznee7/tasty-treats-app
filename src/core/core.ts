import fs from 'fs';
import { Inquiry, NewInquiryPayload } from './types';

const dataFolderPath = './data';

export function saveInquiry(params: NewInquiryPayload) {
  const obj: Inquiry = {
    ...params,
    newsletter: Boolean(params.newsletter),
    date: Date(),
  };

  const data = JSON.stringify(obj);

  try {
    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath);
    }

    fs.writeFileSync(`${dataFolderPath}/${obj.date}.txt`, data);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

export function getInquiries(limit: number) {
  const data: Inquiry[] = [];

  try {
    const files = fs
      .readdirSync(dataFolderPath)
      .map((f) => f.replace('.txt', ''))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, limit);

    files.forEach((element) => {
      const inquiryRaw = fs.readFileSync(`${dataFolderPath}/${element}.txt`);
      const inquiry = JSON.parse(inquiryRaw.toString());
      data.push(inquiry);
    });
  } catch (err) {
    console.log(err);
  }

  return data;
}
