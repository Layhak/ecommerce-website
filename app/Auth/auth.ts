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
          `${process.env.NEXT_PUBLIC_DJANGO_API_URL}user/login/`,
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
});
