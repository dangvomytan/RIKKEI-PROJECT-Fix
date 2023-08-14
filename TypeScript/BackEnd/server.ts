import app from "./src/app/app";
import sequelize from './src/lib/db/mysql.connect';
const port = 8080;

app.listen(port, async () => {
  console.log(`Express Server running at http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connect mysql successfully');
  } catch (error) {
    console.log('Error:', error);
  }
});
