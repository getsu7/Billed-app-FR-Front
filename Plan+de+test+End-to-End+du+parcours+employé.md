# Plan de test End-to-End du parcours employé

## Scénario 1
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis un visiteur (non connecté). |
| **When**  | Je ne remplis pas le champ e-mail ou le champ password du login employé et je clique sur le bouton "Se connecter". |
| **Then**  | Je reste sur la page Login et je suis invité à remplir le champ manquant. |

## Scénario 2
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis un visiteur (non connecté). |
| **When**  | Je remplis le champ e-mail du login employé au mauvais format (sans la forme chaîne@chaîne) et je clique sur le bouton "Se connecter". |
| **Then**  | Je reste sur la page Login et je suis invité à remplir le champ e-mail au bon format. |

## Scénario 3
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis un visiteur (non connecté). |
| **When**  | Je remplis le champ e-mail du login employé au bon format (sous la forme chaîne@chaîne), le champ password du login employé et je clique sur le bouton "Se connecter". |
| **Then**  | Je suis envoyé sur la page de gestion des notes de frais. |

## Scénario 4
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé. |
| **When**  | Je clique sur le bouton "Nouvelle note de frais". |
| **Then**  | Le formulaire de création d'une nouvelle note de frais s'affiche. |

## Scénario 5
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé et j'ai cliqué sur "Nouvelle note de frais". |
| **When**  | Je remplis tous les champs du formulaire (type de dépense, nom, date, montant, fichier justificatif) et je clique sur "Envoyer". |
| **Then**  | La note de frais apparaît dans mon tableau de notes de frais avec le statut "en attente". |

## Scénario 6
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé et j'ai cliqué sur "Nouvelle note de frais". |
| **When**  | Je ne remplis pas tous les champs obligatoires et je clique sur "Envoyer". |
| **Then**  | Je reste sur le formulaire et je suis invité à remplir les champs manquants. |

## Scénario 7
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé. |
| **When**  | Je clique sur une note de frais existante dans mon tableau. |
| **Then**  | Le détail de la note de frais s'affiche avec tous les champs remplis et son statut actuel. |

## Scénario 8
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé et j'ai cliqué sur une note de frais existante. |
| **When**  | Je clique sur le bouton "Visualiser". |
| **Then**  | Une modale apparaît avec le PDF du justificatif. |

## Scénario 9
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé et j'ai cliqué sur une note de frais existante. |
| **When**  | Je clique sur le bouton "Télécharger". |
| **Then**  | Le PDF du justificatif est téléchargé. |

## Scénario 10
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé et j'ai une note de frais avec le statut "refusé". |
| **When**  | Je clique sur cette note de frais. |
| **Then**  | Je peux voir le commentaire expliquant le refus. |

## Scénario 11
| Condition | Description |
|-----------|-------------|
| **Given** | Je suis connecté en tant qu'employé. |
| **When**  | Je clique sur le bouton "Se déconnecter" de la barre verticale. |
| **Then**  | Je suis envoyé à la page Login. |
```
