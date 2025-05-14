import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/useNavigate";
import { getAlbum, getPhotos, getUser } from "@/lib/api";
import { Album, Photo, User } from "@/lib/types";
import { Album as AlbumIcon, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PhotoCarousel } from "@/components/PhotoCarousel";

export default function AlbumDetailPage() {
    const { goBack } = useNavigate()

    const { id } = useParams();
    const [album, setAlbum] = useState<Album | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumData = await getAlbum(String(id));
                setAlbum(albumData);

                const [userData, photosData] = await Promise.all([
                    getUser(String(id)),
                    getPhotos(String(id))
                ]);

                setUser(userData);
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!album || !user) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="p-6">
            <BreadcrumbWithCustomSeparator name="Ablums" Icon={<AlbumIcon size={25} />} />

            <div className="flex  items-center justify-start">
                <Button size={"icon"} onClick={goBack} className="cursor-pointer hover:bg-gray-200">
                    <ArrowLeft className="w-4 h-4 mr-2 flex justify-center items-center" />
                </Button>
                <div className="ml-2">Show Albums</div>
            </div>

            <div className="shadow-2xl rounded-2xl">
                <div className=" p-6">

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`} alt={user.name} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <Link to={`/users/${user.id}`} className="text-lg font-medium text-blue-800 hover:text-blue-500 block">
                                {user.name}
                            </Link>
                            <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:text-blue-500">
                                {user.email}
                            </a>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 p-6"> {album.title}</h2>

                <div className="inline-flex flex-wrap gap-4 p-6">
                    {photos.map((photo) => (
                        <div key={photo.id} className="w-[150px] group relative">
                            <div className="relative">
                                <img
                                    src={photo.thumbnailUrl || "/placeholder.svg"}
                                    alt={photo.title}
                                    width={150}
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => setSelectedPhoto(photo)}
                                        className="bg-white text-black px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-gray-600 truncate" title={photo.title}>
                                    {photo.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                    <DialogContent className="max-w-4xl">
                        {selectedPhoto && (
                            <PhotoCarousel
                                photos={photos}
                                initialIndex={photos.findIndex(p => p.id === selectedPhoto.id)}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    );
}