FROM node:latest

WORKDIR /.

COPY . .

RUN apt-get update && apt-get install -y ghostscript

RUN npm install

ARG imagemagic_config=/etc/ImageMagick-6/policy.xml

RUN if [ -f $imagemagic_config ] ; then sed -i 's/<policy domain="coder" rights="none" pattern="PDF" \/>/<policy domain="coder" rights="read|write" pattern="PDF" \/>/g' $imagemagic_config ; else echo did not see file $imagemagic_config ; fi

CMD ["node", "index.js"]