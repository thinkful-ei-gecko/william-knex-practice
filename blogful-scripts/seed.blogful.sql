BEGIN;

INSERT INTO blogful_articles (title, content, date_published)
VALUES
  ('Article 1', 'Lorem ipsum', now() - '10 days'::INTERVAL),
  ('Article 2', 'Examples', now()),
  ('Article 3', 'This is the content', now() - '15 days'::INTERVAL),
  ('Article 4', 'Why is this not working', now()),
  ('Article 5', 'Tedious', now()),
  ('Article 6', 'Ok got it', now() - '9 days'::INTERVAL),
  ('Article 7', 'Sigh...', now() - '9 days'::INTERVAL),
  ('Article 8', 'Ipsum Lorem', now()),
  ('Article 9', '', now()),
  ('Article 10', 'Changing things', now() - '20 days'::INTERVAL),
  ('Article 11', 'New example', now()),
  ('Article 12', 'Too many contents', now() - '3 days'::INTERVAL),
  ('Article 13', 'Are we done', now()),
  ('Article 14', 'Yet?', now() - '15 days'::INTERVAL),
  ('Article 15', '', now()),
  ('Article 16', 'Please', now()),
  ('Article 17', 'Almost', now() - '5 days'::INTERVAL),
  ('Article 18', 'End', now() - '2 days'::INTERVAL),
  ('Article 19', '', now()),
  ('Article 20', 'This madness', now());

COMMIT;