"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation'
import React from 'react'

export interface Props {
    slug: string;
    encodedSearchQuery: string;
    data: PropsDatum[];
    meta: Meta;
}

export interface PropsDatum {
    id: number;
    attributes: PurpleAttributes;
}

export interface PurpleAttributes {
    title: string;
    slug: string;
    content: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    altthumbnail: string;
    descriptions: null | string;
    thumbnail: Thumbnail;
}

export interface Thumbnail {
    data: ThumbnailDatum[];
}

export interface ThumbnailDatum {
    id: number;
    attributes: FluffyAttributes;
}

export interface FluffyAttributes {
    name: string;
    alternativeText: null | string;
    caption: null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
}

export interface Formats {
    thumbnail: Small;
    small: Small;
}

export interface Small {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

const Searchpage = async () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || '');
    console.log("search params ", encodedSearchQuery);
    const res = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_URL +
        "/api/posts?populate=*&filters[$or][0][title][$contains]=" +
        encodedSearchQuery + "&filters[$or][1][slug][$contains]=" +
        encodedSearchQuery + "&filters[$or][2][content][$contains]=" +
        encodedSearchQuery + "&filters[$or][3][altthumbnail][$contains]=" +
        encodedSearchQuery + "&filters[$or][4][descriptions][$contains]=" +
        encodedSearchQuery
    );
    const jsonData = await res.json();
    console.log("json data output ", jsonData);
    return (
        <div className="h-auto w-auto mx-auto">
            <div className="container grid grid-cols-1 mx-auto space-y-5 md:grid-cols-2 lg:space-y-0">
                {jsonData.data.map((data: PropsDatum) => (
                    <div className="flex flex-col">
                        <CardHeader>
                            <Link href={"/blog/" + data.attributes.slug}>
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_STRAPI_URL +
                                        data.attributes.thumbnail.data[0].attributes.url
                                    }
                                    width={
                                        data.attributes.thumbnail.data[0].attributes
                                            .formats.small.width
                                    }
                                    height={
                                        data.attributes.thumbnail.data[0].attributes
                                            .formats.small.height
                                    }
                                    alt="Picture of the author"
                                    className="rounded-2xl"
                                />
                            </Link>
                        </CardHeader>
                        <CardTitle className="m-6">
                            <Link href={"/blog/" + data.attributes.slug}>
                                <h2 className="card-title">{data.attributes.title}</h2>
                            </Link>
                        </CardTitle>
                        <CardContent className="">
                            <p className="h-24 overflow-hidden">{data.attributes.content}</p>
                        </CardContent>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Searchpage