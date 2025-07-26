import NextAuth from 'next-auth'
import YandexProvider from 'next-auth/providers/yandex'

const handler = NextAuth({
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.id = (profile as any).id
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).accessToken = token.accessToken
      if (session.user) {
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST } 