# hugo-solid-theme
A solid theme for hugo.

# Features

# Shortcodes
## lboxfigure
Creates a `<figure>` element with a lightbox effect, i.e. clickable image.

```
{{< lboxfigure thumb="src="/img/example/thumb.png" src="/img/example/1.png" caption="Fig. 1." style="width:10%" >}}
```

The parameters are fairly self explanatory. Something to note is that the style is applied onto the figure, not the image.

## lboxgallery
Creates a gallery that has lazy loading and a lightbox effect, i.e. clickable image.

```
{{< lboxgallery staticURL="static" parentDir="img/hello/" miniThumbDir="/minithumb" thumbDir="/thumb" fullDir="/full" style="width:10%">}}
```

Will produce many images, an example of one will be:

```
<img class="thumbnail lazy" src="/img/hello/minithumb/20705_090958.jpg" data-src="/img/hello/thumb/20705_090958.jpg" style="width:10%">
```


| Param | Purpose |
| --- | --- |
| `staticURL` | The static directory. Most of the time its just "static". Will be omitted in the final URL |
| `style` | CSS styles for the images, defaults to `max-width:100%` |
| `...Dir` | The directory of the images. We cover some of the image types below: |
| minithumb | An extremely small thumbnail to be loaded before lazy loading. Can be left empty to load nothing before that. |
| thumb | The thumbnail to be loaded by lazy loading. Should be a normal thumbnail now. |
| full | The full image to be shown on clicking the image. | 

Suggested ways to get the different images with imagemagick (change sizes to fit your needs):

minithumb (1-3K):

```
 mkdir minithumb;
 mogrify -path minithumb -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 20% -thumbnail 32 -density 10 -units pixelsperinch -format jpg *.jpg;
 mogrify -path minithumb -auto-orient -define jpg:fancy-upscaling=off -gaussian-blur 2 -resize 256 -format jpg minithumb/*.jpg
```

thumb (10-20K, mostly around 10-15K):
```
 mkdir thumb;
 mogrify -path thumb -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 60% -thumbnail 256 -format jpg *.jpg;
```

full (50K-150K):
```
mkdir full;
mogrify -path full -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 80% -resize 600 -format jpg *.jpg;
```