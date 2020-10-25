
# expo-sqlite-wrapper
Provides a simple and lightweight typescript-based Expo SQLite wrapper with:

* A simple asynchronous class-based ORM wrapper around expo-sqlite
* API for handling migrations for new changes made to production code
* Simple DB logging utility for ease of development  
* Support for multiple databases

> Warning: Web not supported, only iOS and Android. ([See expo-sqlite docs](https://docs.expo.io/versions/latest/sdk/sqlite/))

> Inspired by ([expo-sqlite-orm by dflourusso](https://docs.expo.io/versions/latest/sdk/sqlite/))

## Motivation

expo-sqlite provides a barebones API to interact with a SQLite database. Due to the synchronous nature of the API, it can be challenging to organize a well structured project. 

I wanted a library with which could support typescript types, migrations, and simple development logging, while limiting overhead.

## Installation

`npm install expo-sqlite-wrapper`

# Usage

## Setting up a database connection

### TODO: Add API Definition

This library is designed to have the database loaded along with other resources.

Feel free to put the setup logic inside your main App file, I prefer to use a custom hook.

**useDatabaseConnection.ts**
```typescript
export default function useDatabaseConnection(databaseName: string) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Open connection to database
  useEffect(() => {
    async function loadDatabase() {
      try {
        DatabaseManager.enableLogging(); // If you want logging to console enabled
        await DatabaseManager.openConnection(databaseName, manageVersions);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    };
    loadDatabase();
  }, [])

  return isLoadingComplete;
}
```
Then, in your main App file:

```typescript
  const isDBLoadingComplete = useDatabaseConnection('YOUR_DATABASE_NAME');
    if (!isDBLoadingComplete) {
    return null;
  } else {
    return (
      // your app code here
    );
  }


```