import { Card, CardFooter, CardHeader, Button, Avatar, Skeleton,ScrollShadow } from "@heroui/react";
import { getTranslation } from "@/lib/i18n";
import Link from 'next/link';
import { headers } from 'next/headers'

export default async function HotCreators({ locale = 'en' }) {
    const t = function (key) {
        return getTranslation(locale, key);
    }
    
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const baseUrl = `${protocol}://${host}`
    const creatorsResp = await fetch(`${baseUrl}/api/requestdb?action=creators`,{
        cache: 'no-store'
    });
    const creatorsData = await creatorsResp.json();
    const creators = creatorsData.data||[];

    return (
        <>
            <ScrollShadow className="w-full flex gap-5" orientation="horizontal">
                {creators.map((creator) => (
                    <Card
                        shadow="none"
                        disableRipple
                        className="select-none box-border border-foreground/10 border-[1px] min-w-[160px] max-w-[20%] p-2 flex-shrink-0"
                        radius="lg"
                        key={creator.screen_name}
                    >
                        <CardHeader className="justify-between gap-5">
                            <Avatar
                                isBordered
                                radius="full"
                                size="md"
                                alt={`${creator.name} avatar`}
                                src={creator.profile_image}
                            />
                            <div className="flex flex-col gap-1 items-start justify-center overflow-hidden flex-1">
                                <h4 className="w-full text-small font-semibold leading-none text-default-600 text-ellipsis overflow-hidden whitespace-nowrap">{creator.name}</h4>
                                <h5 className="w-full text-small tracking-tight text-default-400 text-ellipsis overflow-hidden whitespace-nowrap">@{creator.screen_name}</h5>
                            </div>
                        </CardHeader>
                        <CardFooter className="justify-between before:bg-white/10 overflow-hidden w-[calc(100%_-_8px)]">
                            
                                <Button
                                    className="text-tiny text-white m-auto w-[100px]"
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    as={Link}
                                    href={`/tweets?screen_name=${creator.screen_name}`}
                                >
                                    {t('Search')}
                                </Button>
                        </CardFooter>
                    </Card>
                ))}
            </ScrollShadow>
        </>
    );
}