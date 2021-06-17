import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { getInquiries, saveInquiry } from './core/core';
import { validate } from './core/utils';

const indexPage = path.join(__dirname, './pages/index.html');
const newInquiryPage = path.join(__dirname, './pages/new-inquiry.html');
const inquiryListPage = path.join(__dirname, './pages/inquiry-list.html');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(indexPage);
});

app.get('/new-inquiry.html', (req, res) => {
  res.sendFile(newInquiryPage);
});

app.get('/inquiry-list.html', (req, res) => {
  res.sendFile(inquiryListPage);
});

app.get('/inquiry', (req, res) => {
  const limit = Number(req.query.limit || 10);
  res.status(200).send(getInquiries(limit));
});

app.post('/inquiry', (req, res) => {
  const payload = req.body;
  console.log('req', req.body);

  if (!validate(payload)) {
    res.status(400).send();
    return;
  }

  const saved = saveInquiry(payload);

  if (!saved) {
    res.status(500).send();
    return;
  }

  res.status(200).send();
});

app.listen(8082);
