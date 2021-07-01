import { list } from "@keystone-next/keystone/schema";
import { text, select, relationship, integer } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'sickfits'
}

export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary: cloudinaryConfig,
            label: 'Source'
        }),
        altText: text(),
        product: relationship({
            ref: 'Product.photo'
        }),
    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product']
        }
    }
})