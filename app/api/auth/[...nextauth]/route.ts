import NextAuth from "next-auth";
import User from "@/models/user.model";
import connectToDatabase from "@/lib/mongodb/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    if (!credentials) {
                        throw new Error("Credentials not provided");
                    }
                    const user = await User.findOne({ email: credentials.email });
                    if(!user){
                        throw new Error("No user found");
                    }
                    const isValidPassword = await bcrypt.compare(credentials?.password ?? "", user.password as string);
                    if(!isValidPassword){
                        throw new Error("Invalid password");
                    }
                    return user;
                } catch (error) {
                   return null; 
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                }
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };