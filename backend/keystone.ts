import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';

import 'dotenv/config';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //TODO: Add in initial roles here
    }
})
export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL
    },
    lists: createSchema({
        //schema items go in here
        User
    }),
    ui: {
        //Show ui only for people who pass this test
        isAccessAllowed: ({session}) => {
            console.log(session);
            return !!session?.data
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL query
        User: 'id, email, name'
    })
}))