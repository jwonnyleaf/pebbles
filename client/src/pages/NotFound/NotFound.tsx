import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import cat from '@/assets/sadcat.svg';

const NotFound = () => {
  return (
    <div className="grid min-h-svh bg-green text-lightgreen">
        <div className="grid grid-cols-12 place-content-center gap-10 ...">
          <div></div>
          <div></div>
          <div className="col-span-4 ... text-black">
            <Card className = "bg-creme text-purple font-knewave flex flex-col items-center justify-center">
              <div className="p-2"></div>
                <CardTitle className = "text-2xl"><b>MISSING!!</b></CardTitle>
                <img src={cat} alt="A cute cat" className="w-64 h-auto"></img>
              <CardDescription className = "text-lg">
                <div></div>
                <p>cat not found.</p>
              </CardDescription>
              <CardContent className = "text-5xl">
                <h1><b>404.</b></h1>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-5 ... place-content-center">
            <p><b>Oh No!</b></p>
            <p><b>It looks like your cat got lost.</b></p>
            <p><b>Guess you got to move some pebbles to find them...</b></p>
          </div>
      </div>
    </div>
  );
};

export default NotFound;
