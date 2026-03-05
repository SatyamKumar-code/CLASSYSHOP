import React, { useEffect, useState, useMemo } from 'react';
import ProductsSlider from '../ProductsSlider';
import ProductSliderSkeleton from '../skeleton/ProductSliderSkeleton';
import AdsBannerSlider from '../AdsBannerSlider';
import { fetchDataFromApi } from '../../utils/api';

const RandomCategorySections = ({ latestProducts, latestLoading, featuredProducts, featuredLoading }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allBanners, setAllBanners] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchDataFromApi("/api/product/getRandomCategorySections?limit=10").then((res) => {
            if (res?.error === false) {
                setSections(res?.sections);
            }
            setLoading(false);
        });

        // Fetch all banners once
        fetchDataFromApi("/api/product/getAllProductsBanner").then((res) => {
            if (res?.banners) {
                // Shuffle banners randomly
                const shuffled = [...res.banners];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setAllBanners(shuffled);
            }
        });
    }, []);

    // Build all sections: category sections + latest + featured, then shuffle
    const allSections = useMemo(() => {
        const combined = [];

        // Add category sections
        if (sections && sections.length > 0) {
            sections.forEach((section) => {
                combined.push({
                    type: 'category',
                    catType: section.type,
                    sectionName: section.sectionName,
                    products: section.products,
                });
            });
        }

        // Add Latest Products section
        if (latestProducts && latestProducts.length > 0) {
            combined.push({
                type: 'latest',
                sectionName: 'Latest Products',
                products: latestProducts,
            });
        }

        // Add Featured Products section
        if (featuredProducts && featuredProducts.length > 0) {
            combined.push({
                type: 'featured',
                sectionName: 'Featured Products',
                products: featuredProducts,
            });
        }

        // Shuffle all sections randomly (Fisher-Yates)
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }

        return combined;
    }, [sections, latestProducts, featuredProducts]);

    // Randomly pick positions to show AdsBannerSlider between sections
    // Split banners into chunks of 6 - only show next AdsBannerSlider if enough banners
    const { adPositions, bannerChunks } = useMemo(() => {
        if (!allSections || allSections.length === 0 || !allBanners || allBanners.length === 0) {
            return { adPositions: new Set(), bannerChunks: {} };
        }

        // How many ad sliders can we show (each needs 6 banners, except last can have remaining)
        const bannersPerSlider = 6;
        const totalAds = Math.ceil(allBanners.length / bannersPerSlider);

        // If banners < 6, show only 1 AdsBannerSlider
        // If banners >= 6 and < 12, show 2
        // and so on...
        const adCount = Math.min(totalAds, Math.max(1, Math.floor(allSections.length / 3)));

        // Pick random positions for ad sliders
        const positions = [];
        for (let i = 0; i < allSections.length - 1; i++) {
            positions.push(i);
        }
        const shuffledPositions = positions.sort(() => Math.random() - 0.5);
        const selectedPositions = shuffledPositions.slice(0, adCount);

        // Split banners into chunks of 6 (unique, no repeat)
        const chunks = {};
        selectedPositions.forEach((pos, idx) => {
            const start = idx * bannersPerSlider;
            const end = start + bannersPerSlider;
            const chunk = allBanners.slice(start, end);
            if (chunk.length > 0) {
                chunks[pos] = chunk;
            }
        });

        return { adPositions: new Set(Object.keys(chunks).map(Number)), bannerChunks: chunks };
    }, [allSections, allBanners]);

    const isLoading = loading || latestLoading || featuredLoading;

    if (isLoading) {
        return (
            <>
                {[1, 2, 3].map((_, i) => (
                    <section className='py-5 pt-0 bg-white' key={i}>
                        <div className='container'>
                            <div className='bg-gray-200 h-6 w-48 rounded mb-3 animate-pulse'></div>
                            <ProductSliderSkeleton items={6} />
                        </div>
                    </section>
                ))}
            </>
        );
    }

    if (!allSections || allSections.length === 0) return null;

    const getTypeLabel = (section) => {
        if (section.type === 'latest') return 'New';
        if (section.type === 'featured') return 'Featured';
        switch (section.catType) {
            case 'catName': return 'Category';
            case 'subCat': return 'Sub Category';
            case 'thirdsubCat': return 'Collection';
            default: return '';
        }
    };

    const getBadgeColor = (section) => {
        if (section.type === 'latest') return 'bg-[#2196f3]';
        if (section.type === 'featured') return 'bg-[#ff9800]';
        return 'bg-[#ff5252]';
    };

    return (
        <>
            {allSections.map((section, index) => (
                <React.Fragment key={index}>
                    <section className='py-5 pt-0 bg-white'>
                        <div className='container'>
                            <div className='flex items-center gap-3 mb-1'>
                                <h2 className='text-[18px] lg:text-[20px] font-[600]'>{section.sectionName}</h2>
                                <span className={`text-[11px] lg:text-[12px] ${getBadgeColor(section)} text-white px-2 py-[2px] rounded-full font-[500]`}>
                                    {getTypeLabel(section)}
                                </span>
                            </div>
                            <ProductsSlider items={6} data={section.products} />
                        </div>
                    </section>
                    {adPositions.has(index) && bannerChunks[index]?.length > 0 && (
                        <section className='py-5 pt-0 bg-white'>
                            <div className='container'>
                                <AdsBannerSlider items={4} data={bannerChunks[index]} />
                            </div>
                        </section>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default RandomCategorySections;
