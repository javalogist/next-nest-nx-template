# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build service`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t service`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production


WORKDIR /app

RUN addgroup --system service && \
          adduser --system -G service service

COPY dist/service service/
RUN chown -R service:service .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix service --omit=dev -f install

CMD [ "node", "service" ]
