import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';
import { ROOT_DIR_ALIAS } from 'next/dist/lib/constants';
import { Verification } from 'next/dist/lib/metadata/types/metadata-types';

interface VerificationEmailProps{
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp}
    : VerificationEmailProps) {
        return (
            <Html lang="en" dir="ltr">
                <Head>
                    <title>Verification Code</title>
                    
                </Head>
                <Preview>Here&apos;s your verification code: {otp}

                </Preview>
                <Section>
                    <Row>
                        <Heading as="h2">Hello {username},</Heading>
                    </Row>
                    <Row>
                        <Text>
                            Thank You for registering. Please use the following verification code to complete your registration:
                        </Text>
                    </Row>
                    <Row>
                        <Text>{otp}</Text>
                    </Row>
                    <Row>
                        <Text>If you did not request this code, please ignore this email.</Text>
                    </Row>
                </Section>
            </Html>

        )
    }
