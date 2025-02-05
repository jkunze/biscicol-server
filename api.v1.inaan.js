const http = require('http');

const server = http.createServer((req, res) => {

    const qstring = req.url.substring(req.url.indexOf('?')).toLowerCase();
    const noqstring = req.url.split('?')[0];
    const relpath = noqstring.replace('/', '');

    const re = RegExp('ark:/*([^/]+)/');
    const upathparts = relpath.split(re);
    const upathstr = upathparts.join(', ');
    const NAAN = upathparts[1];
    const Name = upathparts[2] || '<ark:NAAN/term expected in URL path part>';
    const humanName = decodeURIComponent(Name);

    var response = '';

    if (qstring == '?' || qstring == '??' || qstring == '?info') {
        response =
`who: ${humanName}
what: (:unkn) unknown definition
when: (:unkn) unknown creation date
where: https://n2t.net/ark:${NAAN}/${Name}
how: (:mtype term) concept literal
persistence: identifier-object binding unbreakable, no known object repository
about: |
 You have accessed an "inline" object (one contained in its own identifier).
 This object is identified by the ARK (Archival Resource Key),
 
     ark:${NAAN}/${Name}
 
 It belongs to a class of ARKs of the form, ark:${NAAN}/<Name>, reserved for
 inline (or in-link) identifiers. All ARKs in this class share the features
 and limitations detailed below.
 
 1. This ARK identifies a conceptual or abstract object. It consists of neither
 more nor less than what its creator meant to suggest in using the linguistic
 and symbolic constructs that make up the <Name> string,
 
     ${humanName}
 
 2. The identified "object" has no implied existence outside this identifier.
 As with any identifier string, however, it may exist in any number of copies.

 3. Anyone can invent this identifier, spontaneously and without registration.
 Someone else can use and intend the same identifier string in their own way.
 
 4. The meaning of this concept may be highly subjective. Longer strings may
 convey more meaning (including definitions) or precision than shorter strings.
 No language choice or namespace scoping is assumed. As with most free-form
 linguistic and symbolic constructs, there may be ambiguity. There are more
 precise ways to identify unique concepts and definitions, including such free
 services as yamz.net (which provides ARKs), w3id.org, and purl.org.
 
 5. The <Name> string is free-form text but subject to syntax rules triggered
 by ARK reserved characters: '/' for containment, '.' for variants, and '-' as
 an identity inert visual separator. Their special meaning can be avoided by
 using URL percent-encoding. For more information on ARKs, see arks.org.
 
 6. The identifier becomes an actionable URL by prepending the ARK resolver,
 
     https://n2t.net/ark:${NAAN}/${Name}
 
 The text you are reading is found by appending the ARK inflection, '?info',
 
     https://n2t.net/ark:${NAAN}/${Name}?info
 
 Resolution of either form produces a YAML document.
 
 7. This type of inline content ARK identifier has features in common with the
 "tag:" and "data:" URI schemes. As with "tag:", it carries an undefined string
 payload, but without any explicit authority. As with "data:", it resolves to
 inline content, but as a YAML document rather than arbitrary (insecure) data.
 
 8. As a binding between a string and a thing, this identifier is extremely
 persistent. By definition, the content never becomes separated from its
 identifier. Moreover, such an ARK, representing a simple form of content-based
 addressing, can be derived (trivially) from the content, and so it cannot be
 re-assigned without itself changing. Conversely, the content can be derived
 manually from the ARK without the aid of a functioning resolver.
 
 Rationale
 ---------
 Self-contained, conceptual, inline URLs have been used for decades, often as
 non-actionable URNs and URLs (returning 404 Not Found errors). In these cases,
 the meanings may be guessed at but are not explicit and their non-actionable
 links yield no further information. Their convenience and low cost, however,
 are still considerable advantages -- no fees, no registration, no storage, no
 concept server, and no configuration. Thus inline URLs will likely continue to
 be used despite their limitations.
 
 To bring more coherence and order to inline URLs, a class of ARK (Archival
 Resource Key) was created for inline concepts. Thus, ARKs of the form,
 
     https://n2t.net/ark:${NAAN}/<Name>
 
 can be created by anyone, without registration, storage, configuration, local
 resolver, server, or fees. They all resolve to information that explains their
 limitations. Inline ARK bindings are extremely persistent.

 To do
 -----
 Change YAML output format to JSON.
 Add some GDPR-like language to enable metrics gathering.

`;
    }
    else {
        response =
`concept: ${humanName}
more: https://n2t.net/ark:${NAAN}/${Name}?info
`;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response);
});

const port = 3028;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

