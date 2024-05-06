import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from '@auth/core/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}user/login/`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const res = await resp.json();

        console.log('Data from login:', res);

        // email: res.user.email,
        // image: res.user?.image,
        // res.accessGitToken = undefined;
        if (resp.ok && res) {
          return {
            id: res.access_token,
            name: res.refresh_token,
            email: res.user.email,
            image: res.user?.image,
          };
        }
        if (!res.ok) {
          throw new Error(JSON.stringify(res));
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    }),
  ],

  // callbacks: {
  //   // @ts-ignore
  //   async signIn({
  //     user,
  //     account,
  //     profile,
  //   }: {
  //     user: any;
  //     account: any;
  //     profile: Profile;
  //   }) {
  //     let email: string;
  //     let name: string;
  //
  //     if (profile) {
  //       email = profile.email;
  //       name = profile.name;
  //     } else if (user) {
  //       email = user.email;
  //       name = user.name;
  //     } else {
  //       console.error('No profile or user information available');
  //       return;
  //     }
  //
  //     console.log('User log from Auth :', user);
  //     // Try to register the user
  //     const password = email + name + process.env.NEXT_PUBLIC_AUTO_PASSWORD;
  //     const registerResult = await registerUser(email, password);
  //     if (registerResult === false) {
  //       // User already exists, log in the user
  //       const user = await loginUser(email, password);
  //       return user;
  //     } else {
  //       const password = email + name + process.env.NEXT_PUBLIC_AUTO_PASSWORD;
  //       await registerUser(email, password);
  //       // New user registered, log in the user
  //       // const user = await loginUser(email, password);
  //       // return user;
  //     }
  //   },
  //   // async session({ session, token, user }) {
  //   // 	console.log('Session:', session);
  //   // 	console.log('Token:', token.email);
  //   // 	console.log('User:', user);
  //   //
  //   // 	// Send properties to the client, like an access_token and user id from a provider.
  //   // 	// session.accessToken = token.accessToken
  //   // 	// session.user.id = token.id
  //   //
  //   // 	return session
  //   // }
  // },
});
