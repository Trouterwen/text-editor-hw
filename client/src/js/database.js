import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => 
{
  const jateStore = await openDB('jate', 1).transaction('jate', 'readwrite').objectStore('jate');

  const request = jateStore.put({ id: 1, value: content });

  const result = await request;

  console.log('data saved to the database', result.value);

}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
{
  
  const jateTran = await openDB('jate', 1).transaction('jate', 'readwrite');

  const jateStored = jateTran.objectStore('jate');

  const request = jateStored.get(1);
  const result = await request;
  result
    ? console.log(' data retrieved from the database', result.value)
    : console.log(' data not found in the database');

  return result?.value;


}

initdb();
