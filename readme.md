<h1>Spustění projektu</h1>
<p>
  Pro spuštění projektu je potřeba mít nainstalovaný Node, docker desktop
  viz
  <a href="https://www.docker.com/products/docker-desktop/">docker.com</a>
</p>
<br /><br />
<h2>Spuštění backendu</h2>
<h3>Spuštění databáze</h3>
<p>
  Zkontrolujte zda existuje složka <strong>mongo-data</strong>, popřípadě
  vytvořte v hlavní složce.
</p>
<p>
  Otevřete si nový terminál a zadejte příkaz
  <code>docker compose up -d --build</code>
</p>
<p>
  Až přestane docker pracovat spusťe databázi příkazem
  <code>docker compose up</code>
</p>
<p style="color: red; font-weight: bold">
  Pozor! Pokud nebude funkční připojení k databázi backend se nespustí!
</p>
<h3>Spuštění NodeJS</h3>
<p>
  Otevřete si nový terminál a zadejte <code>cd .\backend\</code> <br />
  to vás přesune do složky backend (cesta složky by měla vypadat nějak takto
  -> <strong>\mealMeterApp\backend</strong>
</p>
<p>
  Musíme nainstalovat dependencies příkazem <code>npm install</code><br />
  po nainstalování balíčků spustíme backend pomocí
  <code>npm run dev</code> a nebo <code>npm start</code>
</p>
<p style="color: lightblue; text-decoration: underline;">Backend aplikace se spustí na portu 5001.</p>
<br /><br />
<h2>Spuštění frontendu</h2>
<p>
  Otevřete si nový terminál a zadejte <code>cd .\frontend\</code> <br />
  to vás přesune do složky frontend (cesta složky by měla vypadat nějak
  takto -> <strong>\fitnessApp\frontend</strong>
</p>
<p>
  Musíme nainstalovat dependencies příkazem <code>npm install</code><br />
  po nainstalování všech potřebných balíčků spustíme frontend příkazem
  <code>npm start</code>
</p>
<p style="color: lightblue; text-decoration: underline;">Frontend aplikace se spustí na portu 3000.</p>
