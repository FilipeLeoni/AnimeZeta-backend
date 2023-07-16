import { app } from './app';
import { env } from './env';

app.listen(env.PORT, () => console.log('server running on port 3333'));
