import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
}

const Index = () => {
  const [memes, setMemes] = useState<Meme[]>([
    {
      id: 1,
      title: "Классические мемы",
      imageUrl: "/img/48960fc5-7616-400d-8bb4-a965ea99b431.jpg",
      description: "Коллекция популярных интернет-мемов"
    },
    {
      id: 2,
      title: "Дрейк указывает",
      imageUrl: "https://i.imgflip.com/30b1gx.jpg",
      description: "Мем с Дрейком для сравнений"
    },
    {
      id: 3,
      title: "Отвлеченный парень",
      imageUrl: "https://i.imgflip.com/1ur9b0.jpg",
      description: "Мем про выбор и соблазн"
    },
    {
      id: 4,
      title: "Удивленный Пикачу",
      imageUrl: "https://i.imgflip.com/2kbn1e.jpg",
      description: "Классика для выражения удивления"
    }
  ]);

  const [newMeme, setNewMeme] = useState({ title: '', imageUrl: '', description: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMeme = () => {
    if (newMeme.title && newMeme.imageUrl) {
      const meme: Meme = {
        id: Date.now(),
        title: newMeme.title,
        imageUrl: newMeme.imageUrl,
        description: newMeme.description
      };
      setMemes([...memes, meme]);
      setNewMeme({ title: '', imageUrl: '', description: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">😂</span>
              </div>
              <h1 className="text-2xl font-bold text-black">МЕМЫ</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить мем
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-black">Добавить новый мем</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title" className="text-black">Название</Label>
                    <Input
                      id="title"
                      value={newMeme.title}
                      onChange={(e) => setNewMeme({...newMeme, title: e.target.value})}
                      className="border-gray-200 focus:border-black"
                      placeholder="Введите название мема"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl" className="text-black">URL изображения</Label>
                    <Input
                      id="imageUrl"
                      value={newMeme.imageUrl}
                      onChange={(e) => setNewMeme({...newMeme, imageUrl: e.target.value})}
                      className="border-gray-200 focus:border-black"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-black">Описание</Label>
                    <Textarea
                      id="description"
                      value={newMeme.description}
                      onChange={(e) => setNewMeme({...newMeme, description: e.target.value})}
                      className="border-gray-200 focus:border-black"
                      placeholder="Краткое описание мема"
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleAddMeme}
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={!newMeme.title || !newMeme.imageUrl}
                  >
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <Card key={meme.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={meme.imageUrl} 
                    alt={meme.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black mb-2 text-lg">{meme.title}</h3>
                  {meme.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{meme.description}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                        <Icon name="Heart" size={16} className="mr-1" />
                        Нравится
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                      <Icon name="Share2" size={16} className="mr-1" />
                      Поделиться
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {memes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="Image" size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Пока нет мемов</h3>
            <p className="text-gray-600 mb-4">Добавьте первый мем, чтобы начать коллекцию</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;