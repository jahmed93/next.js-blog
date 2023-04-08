import photos from "@/utility/photos.json"
import GalleryWithSlider from "@/components/galleryWithSlider";

export default () => {
	return (
		<GalleryWithSlider photos={photos} />
	);
}
